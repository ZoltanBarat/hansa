import { useState } from 'react'
import { supabase } from '../client'

function List() {

    const [vasarlas, setVasarlas] = useState()
    const [error, setError] = useState()

    async function Fetching() {
        try {
            const { data, count } = await supabase
                .from('vasarlas')
                .select('*', { count: 'exact' })
                .range(0, 999)
            console.log(count)

        } catch (error) {
            setError(error)
        }

    }

    Fetching();

    return (
        <div>

        </div>
    )
}

export default List