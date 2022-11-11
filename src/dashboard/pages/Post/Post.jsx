import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ArticleItem from "../../component/Article/Article"
import { ArticleSection } from "../Home/style"
import { motion } from "framer-motion"
import { toast } from "react-toastify"

export default function Post() {
    const [posts, setPosts] = useState([])
    const [newpost, setNewPost] = useState({
        title:'',
        content:'',
        image:'',
    })
    const [formShow, setformShow] = useState(false)
    const token = sessionStorage.getItem('token')

    const postAnArticle = async() =>{
        const formData = new FormData();
        formData.append('title', newpost.title)
        formData.append('content', newpost.content)
        formData.append('image', newpost.image)
        const response = await axios.post(`https://jcc.brandingyou.id/api/post`, formData ,{
            headers:{
                'Authorization' : `Bearer ${token}`,
            }})
        toast.success(response.data.meta.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        document.getElementById('judul').value = ''
        document.getElementById('deskripsi').value = ''
        document.getElementById('image').value = ''
    }

    useEffect(()=>{
        setInterval(() => {
            let ignore = false
            if (!ignore) {
                axios.get('https://jcc.brandingyou.id/api/post', {
                headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            }}).then((res)=>{
                setPosts(res.data.data)
            }).catch((err)=>console.log(err))
            }
            return () =>{
                ignore = true
            }
        }, 3000);
    },[])


    const showForm=()=>{
        if (!formShow) {
            document.getElementById('btn-show').classList.toggle('float-end')
            document.getElementById('btn-show').classList.remove('btn-primary')
            document.getElementById('btn-show').classList.add('btn-danger')
            document.getElementById('btn-show').innerText = 'Sembunyikan Form'
            document.getElementById('form-tambah').classList.toggle('d-none')
            setformShow(true)
        }else{
            document.getElementById('btn-show').classList.toggle('float-end')
            document.getElementById('btn-show').classList.add('btn-primary')
            document.getElementById('btn-show').classList.remove('btn-danger')
            document.getElementById('btn-show').innerText = 'Tambah Data'
            document.getElementById('form-tambah').classList.toggle('d-none')
            setformShow(false)
        }
    }
    return(
        <>
            <div className="row">
            <div className="col-md-12">
                <ArticleSection>
                    <div className="d-flex justify-content-between">
                    <h2>Article Section </h2>
                    <button className="btn btn-primary mb-5" onClick={showForm} id='btn-show'>Tambah Data</button>
                    </div>
                    <hr />
                    <motion.form className="mb-5 d-none" onSubmit={(e)=>e.preventDefault()} id="form-tambah">
                        <div className="mb-3">
                            <label htmlFor="" className="label">Judul</label>
                            <input type="text" placeholder="Apa judul yang pas untuk postingan ini ?" id="judul" className="form-control" onChange={(e)=>setNewPost((newpost)=> ({ ...newpost, title:e.target.value}))}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="label">Deskripsi</label>
                            <textarea placeholder="Apa hal terabsurd yang sedang anda pikirkan ?" id="deskripsi" className="form-control" onChange={(e)=>setNewPost((newpost)=> ({ ...newpost, content:e.target.value}))}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="label">Gambar</label>
                           <input type="file" className="form-control" id="gambar" onChange={(e)=>setNewPost((newpost)=> ({ ...newpost, image:e.target.files[0]}))} accept='image/*'/>
                        </div>
                        <div className="mb-3">
                            <button onClick={postAnArticle} className="btn btn-primary">Post Sekarang!</button>
                        </div>
                    </motion.form>
                    {posts.length !== 0 ? posts.map((v,idx)=>{
                        return(
                            <ArticleItem key={idx} id={v.id} judul={v.title} desc={v.content} penulis={v.author} image={v.image} />
                        )
                    }) : <p className="fs-5 text-center">Tidak ada data</p>}
                    <div className="d-flex justify-content-center">
                    </div>
                </ArticleSection>
            </div>
        </div>
        </>
    )
}