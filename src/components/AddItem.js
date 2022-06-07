import { useState, useEffect } from 'react';
import { supabase } from '../client';
import './AddItem.css';

function AddItem(props) {

    const [goodsList, setGoodsList] = useState()
    const [error, setError] = useState()
    const [selectedGood, setSelectedGood] = useState('42109869,227.56')

    async function Fetching() {
        try {
            const { data } = await supabase
                .from('cikkek')
                .select('nev, id, nettoegysegar')
                
            setGoodsList(data)

        } catch (error) {
            setError(error)
        }
    }

    async function Add() {
        try {
            const { data, error } = await supabase
                .from('vasarlas_tetel')
                .insert([
                    {
                        mennyiseg: 1,
                        partnerctid: parseInt(selectedGood.split(',')[0]),
                        partnerid: props.partnerid,
                        vasarlasid: props.vasarlasid,
                        brutto: parseInt(selectedGood.split(',')[1])
                    }
                ])
                
                .then(mySubscription)
            

        } catch (error) {
            setError(error)
        }
    }

    const mySubscription = supabase
                .from('vasarlas_tetel')
                .on('INSERT', payload => {
                    console.log('Change received!', payload)
                })
                .subscribe()


    function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
        console.log('selectedGood: ', selectedGood)
        console.log(typeof selectedGood)
        console.log(   {
                        mennyiseg: 1,
                        partnerctid: parseInt(selectedGood.split(',')[0]),
                        partnerid: props.partnerid,
                        vasarlasid: props.vasarlasid,
                        brutto: parseInt(selectedGood.split(',')[1])
                    })
        Add();        
    }


    useEffect(() => {        
        Fetching();      
    }, [])


    if (error) {
        return <h1>{ error }</h1>
    }


  return (
      <div className='addConatainer center'>
          <form onSubmit={(e)=> handleSubmit(e)} value="value">
             <input className='addButton' type="submit" value="+" />
              <select
                  name="cikkek"
                  onChange={(e) => setSelectedGood((e.target.value))}
              >
              {goodsList && goodsList.map((item, index) => 
                  <option key={index} value={[item.id,item.nettoegysegar]}>{ item.nev}</option>
                    )}
                </select>
          </form>
              
    </div>
  )
}

export default AddItem