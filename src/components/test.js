import React from 'react'

function test() {
    const [TtrPList, setTtrPList] = useState([])
    const getTtr = () => {
        fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=0d0f1379d0c8b95596f350605ec7f984')
            .then(res => res.json())
            .then(json => setTtrPList(json.results))
    }
    useEffect(() => { getTtr() }, [])
    console.log(TtrPList)
    return (
        <div>

        </div>
    )
}

export default test
