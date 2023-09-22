/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import fileImage from './assets/file-image.svg'
import check from './assets/circle-check-filled.svg'
import './App.css'

function App() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const onDragOver = (e: any) => {
    e.preventDefault();
    console.log('on drag over')
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImage(reader.result);
      };
  
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: any) => {
    const mainModal = document.getElementById('main-modal')
    if (mainModal) {
      mainModal.className = ''
    }
    setTimeout(() => {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImage(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }

      if (mainModal) {
        mainModal.className = 'hidden'
      }
    }, 1000);
  };

  return (
    <>
      <div className='main'>
        <div className='main-container'>
          {image && (<img src={check} className="icon-2" alt="Upload your image..."/>)}
          {image ? (<p className='title'>Uploaded Suceessfully!</p>) : (<p className='title'>Upload your image</p>)}
          {/* <p className='title'>Upload your image</p> */}
          {image ? (<p className='subtitle'></p>) : (<p className='subtitle'>File should be Jpeg, Png...</p>)}
          {/* <p className='subtitle'>File should be Jpeg, Png...</p> */}
          <div className={image ? 'container-image' : 'container'} onDragOver={onDragOver} onDrop={onDrop}>
            {image ? (
            <img className='image' src={typeof image === 'string' ? image : undefined} alt="Preview" />
            ) : (
              <>
                <img src={fileImage} className="icon" alt="Upload your image..." />
                <p className='label-container'>Drag & Drop your image</p>
              </>
            )}
          </div>
          {/* <p className='label-or'>Or</p> */}
          {image ? (<p className='label-or'></p>) : (<p className='label-or'>Or</p>)}
          <input id="fileInput" type="file" onChange={handleChange} style={{ display: 'none' }}  />
          {image ? (<p className='label-or'></p>) : ( <button className='button' onClick={() => document.getElementById('fileInput')?.click()}>Choose a file</button>)}
          {image ?
            (
              <div className='content-copy'>
                <input type='text' className='input-copy'/>
                <button className='button-copy'>Copy</button>
              </div>
            ) 
            : 
            (
              <p className='label-or'></p>
            )
          }
          {/* <button className='button' onClick={() => document.getElementById('fileInput')?.click()}>Choose a file</button> */}
        </div>
      </div>
      <div id='main-modal' className='hidden'>
        <div className='modal hidden'>
          <p>Uploading...</p>
          <div className='loader'></div>
        </div>
      </div>
    </>
  )
}

export default App
