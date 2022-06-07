import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import './SearchList.css';
import Loading from './Loading';
import { CSVLink } from "react-csv";

function SearchList(props) {

    const [filteredVasarlas, setFilteredVasarlas] = useState();
    const [range, setRange] = useState(0);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({ target: 'esemenydatumido', ascending: false });
    
    async function Fetching() {
        try {     
            console.log('in S-éist', props.search);
            setLoading(true)
            const { data } = await supabase
                .from('vasarlas')
                .select('*', { count: 'exact' })
                .eq(props.searchWhere, props.search)
                .range(range, range + 250)
                .order(order.target,  {ascending: order.ascending} )
                
            
            setFilteredVasarlas(data)
            setLoading(false)
            console.log('fetching')

        } catch (error) {
            setError(error)
        }
    }

  
    useEffect(() => {           
        Fetching();      
    }, [])

    useEffect(() => {       
        setRange(0)
        Fetching();             
    }, [order, props.search, props.searchWhere])
    
    const Next = () => {        
        setRange(range + 250);
        setLoading(true);
        Fetching(); 
    }

    const Prev = () => {
        if (range > 0) {            
            setRange(range - 250);
            setLoading(true);
            Fetching();
        }
    }


    if (error) {
        return <h1>{ error }</h1>
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='center'>
        { filteredVasarlas && <CSVLink className='filteredDownloadButton' data={filteredVasarlas} filename={`filtered_vasarlas.csv`} target='_blank'>Letöltés</CSVLink>}
             <div className='listNavContainer'>
                <button className='listNavButton' onClick={() => Prev()}>Prev</button>
                <div>({ range } ... { range + 250 })</div>
                <button className='listNavButton'onClick={()=>Next()}>Next</button>
            </div>

           
            {filteredVasarlas && <table className='search-list'>
                <thead>
                    <tr>
                        <th>Bolt ID
                            <button className={`orderButton ${order.target === 'boltid' && order.ascending === true ? '--active' : null}`} onClick={() => setOrder({ target: 'boltid', ascending: true })}>⇧</button>
                            <button className={`orderButton ${order.target === 'boltid' && order.ascending === false ? '--active' : null}`} onClick={() => setOrder({ target: 'boltid', ascending: false })}>⇩</button>
                        </th>
                        <th>Dátum
                            <button className={`orderButton ${order.target === 'esemenydatumido' && order.ascending === true ? '--active' : null}`} onClick={() => setOrder({ target: 'esemenydatumido', ascending: true })}>⇧</button>
                            <button className={`orderButton ${order.target === 'esemenydatumido' && order.ascending === false ? '--active' : null}`} onClick={() => setOrder({ target: 'esemenydatumido', ascending: false })}>⇩</button>
                        </th>
                        <th>Pénztárazonosító
                            <button className={`orderButton ${order.target === 'penztargepazonosito' && order.ascending === true ? '--active' : null}`} onClick={() => setOrder({ target: 'penztargepazonosito', ascending: true })}>⇧</button>
                            <button className={`orderButton ${order.target === 'penztargepazonosito' && order.ascending === false ? '--active' : null}`} onClick={() => setOrder({ target: 'penztargepazonosito', ascending: false })}>⇩</button>
                        </th>
                        <th>Összeg
                            <button className={`orderButton ${order.target === 'vasarlasosszeg' && order.ascending === true ? '--active' : null}`} onClick={() => setOrder({ target: 'filteredVasarlasosszeg', ascending: true })}>⇧</button>
                            <button className={`orderButton ${order.target === 'vasarlasosszeg' && order.ascending === false ? '--active' : null}`} onClick={() => setOrder({ target: 'filteredVasarlasosszeg', ascending: false })}>⇩</button>
                        </th>
                        <th>Részletek                      
                        </th>
                    </tr>
                </thead>
           
                    <tbody>
                        { filteredVasarlas.map((item, index) => (
                            <tr key={index}>
                                <td>{item.boltid}</td>
                                <td>{item.esemenydatumido.replace('T', ' ')}</td>
                                <td>{item.penztargepazonosito}</td>
                              <td>{item.vasarlasosszeg} <i>HUF</i></td>
                                <td><Link
                                    onClick={() => props.setItemId(item.id)}                                   
                                    to={`/vasarlasi_tetel/${item.id}`}
                                    >📄</Link></td>
                            </tr>
                        ))}
                    </tbody>
                
            </table>}
           
        </div>
    )
}

export default SearchList