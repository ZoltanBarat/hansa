import { useState } from 'react';
import './Search.css';
import SearchList from './SearchList';
import { Link } from 'react-router-dom';

function List(props) {

    const [search, setSearch] = useState(1)
    const [searchWhere, setSearchWhere] = useState('penztargepazonosito')
    
    return (
        <div className='center'>
            <h2>Keresés</h2>
            <Link className='navLink' to={'/hansa'}>Fő tábla</Link>
            
            <div className='searchContainer'>
                <form>
                    <select onChange={(e)=> setSearchWhere(e.target.value)}>
                        <option value='penztargepazonosito'>Pénztárazonosító</option>
                        <option value='boltid'>Bolt id</option>
                        <option value='esemenydatumido'>Dátum</option>
                        <option value='vasarlasosszeg'>Összeg</option>
                    </select>
                    <span>=</span>
                    <input onChange={(e) => setSearch(e.target.value)}></input>

                </form>                
            </div>
            <SearchList setItemId={ props.setItemId } search={search} searchWhere={ searchWhere }/>          
        </div>
    )
}

export default List