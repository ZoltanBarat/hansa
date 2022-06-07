import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import AddItem from './AddItem';
import './Details.css';
import { CSVLink } from "react-csv";

function Details(props) {

    const [tetel, setTetel] = useState();
    const [error, setError] = useState();
    const [tetelId, setTetelId] = useState();
    const [showGood, setShowGood] = useState(false);
    const [goods, setGoods] = useState();
    const [coords, setCoords] = useState({x: 0, y: 0});



    async function Fetching() {
        try {
            const { data } = await supabase
                .from('vasarlas_tetel')
                .select('*')
                .match({ 'vasarlasid': props.itemId }) 
                            
            setTetel(data)

        } catch (error) {
            setError(error)
        }
    }

    async function GoodsFetching() {
        try {
            const { data } = await supabase
                .from('cikkek')
                .select('*')
                .match({ 'id': tetelId })         
                
            setGoods(data)
        } catch (error) {
            setError(error)
        }
    }


    useEffect(() => {
        Fetching();      
    }, [])


    useEffect(() => {
        if (tetelId) {
            GoodsFetching();             
        }
    }, [tetelId])
    
    if (error) {
        return <h1>{ error }</h1>
    }


  return (
      <div className='center'> 
          <div className='buttonContainer'>
            <button className='backButton' onClick={() => window.history.back()}>← Back</button>
            { tetel && <CSVLink data={tetel} filename={`${props.itemId}_tetel.csv`} target='_blank'>Letöltés</CSVLink>}
          </div>    
          <p><b>A {props.itemId} tétel:</b></p>
          <button className='refreshButton' onClick={()=>Fetching()}>↻ Frissítés</button>
          <div className='tetelContainer'>
            <table className='tetel-list'>
              <thead>
                <tr>
                    <th>Id</th>
                    <th>Partner Id</th>
                    <th>Mennyiség</th>
                    <th>Bruttó</th>                    
                    <th>Cikk</th>
                </tr>
              </thead>
              <tbody>
                  {tetel && tetel.map((item, index) => (
                      <tr key={index} onMouseOver={() => {
                          setShowGood(true);
                          setTetelId(item.partnerctid);             
                      }}
                          onMouseEnter={(e) => {
                              setCoords({ x: e.clientX, y: e.clientY })                         
                          }}
                          onMouseLeave={(e)=> setShowGood(false)}
                      >
                          <td>{ item.id }</td>
                          <td>{ item.partnerid }</td>
                          <td>{ item.mennyiseg }</td>
                          <td>{ item.brutto }</td>
                          <td>{ item.partnerctid }</td>
                    </tr>
                    ))}
              </tbody>
          </table>

              {(showGood && goods) ? 
                  (<div className='goods-listContainer' style={{top: coords.y + 5, left: coords.x + 20}}>                     
                      {goods && goods.map((item, index) => (
                            <div className='goods-list' key={index}>              
                                <h5>Név: <span>{ item.nev }</span></h5>
                                <h5>Nettó egységár: <span>{ item.nettoegysegar } HUF</span></h5>
                            </div>
                            ))}
            
                  </div>) :
              (null)
          }
          </div>
          { tetel && <AddItem partnerid={tetel[0].partnerid} vasarlasid={tetel[0].vasarlasid }/>}
                 
      </div>
  )
}

export default Details