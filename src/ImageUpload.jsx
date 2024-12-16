import React, { useState } from 'react'

const ImageUpload = () => {
  const [loading,setLoading]=useState(false)
  const handleFileUpload=async (event)=>{
    const file=event.target.files[0]

    if (!file) return
setLoading(true)
    const data= new FormData()
    data.append("file",file)
    data.append("upload_preset","proshore-image")
    data.append("cloud_name","dk3i2kpt4")

  const res=  await fetch("https://api.cloudinary.com/v1_1/dk3i2kpt4/image/upload",{
      method:"POST",
      body: data
    })
    const uploadedImageURL= await res.json()
    console.log(uploadedImageURL)
    setLoading(false)

  }
  return (
    <>
    
    <h1>Upload Image</h1>
    <div className="file-upload">
      <div className="upload-container">
        {
          loading ? "Uploading....." :<img src='public/upload-icon.png' style={{width:'40px',height:'40px',margin:'-10px 20px'}}/>
        }
        <input type="file" className='file-input' onChange={handleFileUpload} />
      </div>
    </div>

    </>
  )
}

export default ImageUpload