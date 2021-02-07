import {useState} from 'react';

const Create = () => {

    const [Name,setName] = useState();
    const [Price,setPrice] = useState();
    const [Description,setDescription] = useState();
    const [Mediaurl,setMediaurl] = useState();

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log("{}{}{}{{{}{{}{{}000",Name,Price,Description,Mediaurl)
    }

    return (
        <div>
            <form className="container" onSubmit={(e)=>handlesubmit(e)}>
                <input type="text" name="Name" placeholder="Name"
                    value={Name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <input type="text" name="Price" placeholder="Price"
                    value={Price}
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
                <img className="responsive-img" src={Mediaurl ? URL.createObjectURL(Mediaurl) : ""}/>
                <div className="input-field col s12">
                    <textarea id="textarea2" className="materialize-textarea" data-length="120" placeholder="Description"
                        value={Description}
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
