import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import './List.css';
import Loading from './Loading';

function List(props) {

    const [vasarlas, setVasarlas] = useState();
    const [range, setRange] = useState(0);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [shops, setShops] = useState();
    const [order, setOrder] = useState({ target: 'esemenydatumido', ascending: false });

    
    async function Fetching() {
        try {            
            const { data } = await supabase
                .from('vasarlas')
                .select('*', { count: 'exact' })
                .range(range, range + 250)
                .order(order.target,  {ascending: order.ascending} )
            
            setVasarlas(data)
            setLoading(false)

        } catch (error) {
            setError(error)
        }
    }

    async function shopFetching() {
        try {            
            const { data } = await supabase
                .from('bolt')
                .select('*')                            
           
            setShops(data)
        } catch (error) {
            setError(error)
        }
    }

  
    useEffect(() => {
        shopFetching();       
        Fetching();             
      
    }, [])

    useEffect(() => {
        shopFetching();        
        Fetching();             
    }, [order])
    
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

    function findShopName (id) {
        if (shops) {
            const searchIndex = shops.findIndex(s => s.id === id); 
            return shops[searchIndex].nev
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
            <h2>Vásárlás</h2>
            <Link className='navLink' to={ '/kereses'}>Keresés</Link>
            <div className='listNavContainer'>
                <button className='listNavButton' onClick={() => Prev()}>Prev</button>
                <div>({ range } ... { range + 250 })</div>
                <button className='listNavButton'onClick={()=>Next()}>Next</button>
            </div>
           
            <table className='main-list'>
                <thead>
                    <tr>
                        <th>Bolt
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
                            <button className={`orderButton ${order.target === 'vasarlasosszeg' && order.ascending === true ? '--active' : null}`} onClick={() => setOrder({ target: 'vasarlasosszeg', ascending: true })}>⇧</button>
                            <button className={`orderButton ${order.target === 'vasarlasosszeg' && order.ascending === false ? '--active' : null}`} onClick={() => setOrder({ target: 'vasarlasosszeg', ascending: false })}>⇩</button>
                        </th>
                        <th>Részletek                      
                        </th>
                    </tr>
                </thead>
           
                    <tbody>
                        { vasarlas.map((item, index) => (
                            <tr key={index}>
                                <td>{findShopName(item.boltid)}</td>
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
                
            </table>
           
        </div>
    )
}

export default List