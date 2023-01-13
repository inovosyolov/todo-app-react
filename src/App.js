import React, { useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'
import './App.css'

function App() {

  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    }
    else {
      alert('Enter something...')
      setItem('')
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id ))
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <input 
        placeholder='Enter something...'
        type="text" 
        onChange={ (e) => setItem(e.target.value) }
        />
        <button className="enter-btn" onClick={newItem}>Enter</button>
      </div>

      {
        items.map((item, index) => {
          return (
            <Draggable 
              key={index}
              defaultPosition={item.defaultPos}
            >
              
              <div className="todo__item" style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button 
                className='delete-btn'
                onClick={() => deleteNode(item.id)}
                >
                  X
                </button>
              </div>

            </Draggable>
          )
        })
      }

    </div>
  );
}

export default App;
