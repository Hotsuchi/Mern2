import axios from 'axios';
import { useState,useEffect } from 'react';


function App() {
    //const [ del,setDel ] = useState('');
    const [data,setData]=useState({uname:'',pass:''})
    const [read,setRead] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:5000/read')
        .then((req)=>setRead(req.data))
        .catch((err)=>setRead(err));
    })
    
    let cngDta = (e)=>{
        let oldDta = {...data};
        let inpNam = e.target.name;
        let inpVal = e.target.value;
        oldDta[inpNam]= inpVal;
        setData(oldDta);
    }
    let subForm = (e)=>{
        e.preventDefault();
        if(data._id){
            axios.put(`http://localhost:5000/update/${data._id}`,data)
            .then(()=>alert('data updated'));
            
            setData({uname:'',pass:'',_id:''});
        }else{
            axios.post('http://localhost:5000/read',{uname:data.uname,pass:data.pass})
            .then(()=>alert('data saved'))
            .catch((err)=>alert('data not saved'));
        
            setData({uname:'',pass:'',_id:''});
        }
    }
    let delFun = (id)=>{
        axios.delete(`http://localhost:5000/delete/${id}`);
    }
    
    let udtFun = (id)=>{
        axios.get(`http://localhost:5000/txdta/${id}`)
        .then((res)=>setData(res.data));
    }
    
    
    return (
        <div className="bg-slate-800 text-white min-h-screen">
            
            <div className="w-screen py-10 flex justify-center items-center">
                <form onSubmit={subForm} className="border-1 p-4 flex flex-col justify-center items-center gap-2 rounded">
                    <input onChange={cngDta} type="text" name="uname" placeholder="name" value={data.uname} className="border-1 outline-none px-2 rounded"/>
                    <input onChange={cngDta} type="number" name="pass" placeholder="password" value={data.pass} className="border-1 outline-none px-2 rounded"/>
                    <button className="border-1 bg-cyan-600 px-4 py-2 rounded">{(data._id)?'Update': 'Save'}</button>
                </form>
            </div>
            
            <div className="py-2">
                <ul>
                    <li className="w-screen px-2 grid grid-cols-[10%_1fr_1fr_1fr_1fr] gap-2 text-center">
                        <span className="border rounded">Id</span>
                        <span className="border rounded">Name</span>
                        <span className="border rounded">Password</span>
                        <span className="border rounded">Edit</span>
                        <span className="border rounded">Delete</span>
                    </li>
                    {read.map((v,i)=>(
                    <li className="mt-2 w-screen px-2 grid grid-cols-[10%_1fr_1fr_1fr_1fr] gap-2 text-center">
                        <span className="border rounded">{i+1}</span>
                        <span className="border rounded">{v.uname}</span>
                        <span className="border rounded">{v.pass}</span>
                        <span onClick={()=>udtFun(v._id)}className="border rounded">Edit</span>
                        <span onClick={()=>delFun(v._id)} className="border rounded">Delete</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
