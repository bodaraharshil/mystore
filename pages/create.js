import {useState} from 'react';

const Create = () => {

    const [name,setName] = useState();
    const [price,setPrice] = useState();
    const [description,setDescription] = useState();
    const [mediaurl,setMediaurl] = useState();

    const imageUpload = async() => {
        const Formdata =  new FormData();
        Formdata.append("file",mediaurl);
        Formdata.append("upload_preset","mystore");
        Formdata.append("clound_name","nilkanth");
        const res = await fetch(`https://api.cloudinary.com/v1_1/nilkanth/image/upload`,{
            method:"POST",
            body:Formdata
        });
        const data = await res.json();
        return data.url
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        const mediaurl =  await imageUpload();
        const res = await fetch(`http://localhost:3000/api/products`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                price,
                description,
                mediaurl 
            })
        })
        const data = await res.json();
        if(data.error)
        {
            M.toast({html:data.error,classes:"red"})
        }
        else
        {
            M.toast({html:data.message,classes:'green'})
        }
    }

    return (
        <div>
            <form className="container" onSubmit={(e)=>handlesubmit(e)}>
                <input type="text" name="name" placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input type="text" name="price" placeholder="Price"
                    value={price}
                    onChange={(e)=>setPrice(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input type="file" 
                            accept="image/*"
                            onChange={(e)=>setMediaurl(e.target.files[0])}
                        />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <img className="responsive-img" src={mediaurl ? URL.createObjectURL(mediaurl) : ""}/>
                <div className="input-field col s12">
                    <textarea id="textarea2" className="materialize-textarea" data-length="120" placeholder="Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
        
            </form>
        </div>
    )
}

export default Create
