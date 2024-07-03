import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';
import axios from 'axios';

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const saveUserPreferences = (userId, preferences) => {
    return setDoc(doc(firestore, 'users', userId), { preferences }, { merge: true });
  };

  const addToWatchList = async (userId, item) => {
    const userDocRef = doc(firestore, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, { watchList: [item] });
    } else {
      const userData = userDocSnap.data();
      const watchList = userData.watchList || [];

      const itemExists = watchList.some((existingItem) => existingItem.id === item.id);

      if (!itemExists) {
        await updateDoc(userDocRef, {
          watchList: arrayUnion(item),
        });
      }
    }
  };

  const removeFromWatchList = async (userId, item) => {
    const userDocRef = doc(firestore, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        watchList: arrayRemove(item),
      });
    } else {
      console.error('No document to update');
    }
  };

  // Your TMDB API key
  const TMDB_API_KEY = '0d0f1379d0c8b95596f350605ec7f984';
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  // Sample genre name to ID mapping (replace with actual genre IDs from TMDB)
  const movieGenres = [
    { value: "28", label: "Action" },
    { value: "12", label: "Adventure" },
    { value: "35", label: "Comedy" },
    { value: "80", label: "Crime" },
    { value: "18", label: "Drama" },
    { value: "10751", label: "Family" },
    { value: "14", label: "Fantasy" },
    { value: "36", label: "History" },
    { value: "27", label: "Horror" },
    { value: "10402", label: "Music" },
    { value: "9648", label: "Mystery" },
    { value: "10749", label: "Romance" },
    { value: "878", label: "Science Fiction" },
    { value: "10770", label: "TV Movie" },
    { value: "53", label: "Thriller" },
    { value: "10752", label: "War" },
    { value: "37", label: "Western" },
  ];

  const tvGenres = [
    { value: "10759", label: "Action" },
    { value: "35", label: "Comedy" },
    { value: "80", label: "Crime" },
    { value: "18", label: "Drama" },
    { value: "10751", label: "Family" },
    { value: "10762", label: "Kids" },
    { value: "9648", label: "Mystery" },
    { value: "10765", label: "Fantasy" },
    { value: "10768", label: "War & Politics" },
    { value: "37", label: "Western" },
  ];

  // Function to fetch movie recommendations from TMDB based on genre
  const fetchTMDBMovieRecommendations = async (genreName) => {
    const genre = movieGenres.find(genre => genre.label === genreName);
    if (!genre) {
      console.error(`Genre not found for name: ${genreName}`);
      return [];
    }

    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genre.value
        }
      });
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching TMDB movie recommendations for genre ${genreName}:`, error.message);
      return [];
    }
  };

  // Function to fetch TV recommendations from TMDB based on genre
  const fetchTMDBTVRecommendations = async (genreName) => {
    const genre = tvGenres.find(genre => genre.label === genreName);
    if (!genre) {
      console.error(`Genre not found for name: ${genreName}`);
      return [];
    }

    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/tv`, {
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genre.value
        }
      });
      return response.data.results;
    } catch (error) {
      console.error(`Error fetching TMDB TV recommendations for genre ${genreName}:`, error.message);
      return [];
    }
  };

  const fetchRecommendations = async (userId) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log('No such document!');
        return [];
      }

      const userData = userDocSnap.data();
      const watchList = userData.watchList || [];

      if (watchList.length === 0) {
        console.log('Watch list is empty');
        return [];
      }

      console.log('Watch list:', watchList);

      const genreCount = {};
      watchList.forEach((item) => {
        if (item.genres && Array.isArray(item.genres)) {
          item.genres.forEach((genre) => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
          });
        } else {
          console.log('Item with missing or invalid genres:', item);
        }
      });

      console.log('Genre count:', genreCount);

      const genres = Object.keys(genreCount);
      if (genres.length === 0) {
        console.log('No genres found in watch list');
        return [];
      }

      // Sort genres by count in descending order and get the top 2
      const sortedGenres = genres.sort((a, b) => genreCount[b] - genreCount[a]);
      const mostCommonGenres = sortedGenres.slice(0, 2);

      console.log('Most common genres:', mostCommonGenres);

      // Fetch movie recommendations for the top 2 genres
      const [movieRecommendationsGenre1, movieRecommendationsGenre2] = await Promise.all(
        mostCommonGenres.map((genre) => fetchTMDBMovieRecommendations(genre))
      );

      // Fetch TV recommendations for the top 2 genres
      const [tvRecommendationsGenre1, tvRecommendationsGenre2] = await Promise.all(
        mostCommonGenres.map((genre) => fetchTMDBTVRecommendations(genre))
      );


      // Combine and return the recommendations
      const movierecommendations = [
        ...movieRecommendationsGenre1,
        ...movieRecommendationsGenre2,

      ];
      const tvrecommendations = [

        ...tvRecommendationsGenre1,
        ...tvRecommendationsGenre2
      ];
      // const recommendations = [
      //   ...movierecommendations,
      //   ...tvrecommendations
      // ];
      const recommendations = { movie: movierecommendations, tv: tvrecommendations }
      return recommendations;

    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };




  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    saveUserPreferences,
    addToWatchList,
    removeFromWatchList,
    fetchRecommendations,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
