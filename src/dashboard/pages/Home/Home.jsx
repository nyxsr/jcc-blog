import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleItem from "../../component/Article/Article";
import { ArticleSection, GreetingSection } from "./style";

export default function Home() {
    const [greeting, setGreeting] = useState('')
    const [posts, setPosts] = useState([])
    const token = sessionStorage.getItem('token')
    const data = JSON.parse(sessionStorage.getItem('session-item'))

    const d = new Date();
    let hour = d.getHours();

    useEffect(()=>{

        if (hour >= 6 && hour < 11) {
            setGreeting('Selamat Pagi! Semangat Menjalani Aktifitas yaa 🔥🔥🔥')
        }else if(hour >= 10 && hour < 14){
           setGreeting( 'Selamat Siang! Semoga harimu lancar dan banyak keberkahan ya 😘😘😘')
            }else if(hour >= 14 && hour < 18){
               setGreeting( 'Selamat Sore! Masih semangat ya kan ?😆')
            }else if(hour >= 18 && hour < 23){
               setGreeting( 'Selamat Malam! Mari kita menikmati malam dengan secangkir kopi ☕')
            }else if(hour >= 23 && hour < 6){
               setGreeting( 'Sudah larut malam! Mari kita beristirahat demi menjalani hari esok 🤗🤗🤗')
            }
        },[])

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
        }, 2000);
    },[])
        const splittedString = greeting.split('!')
        // console.log(token)
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <GreetingSection whileHover={{scale:1.1}} transition={{type:'spring', damping:10, duration:1,repeat:'infinity'}}>  
                <p className="fs-1">Halo, <span style={{fontWeight:'600'}}>{data.name ? data.name : ''}</span> !! </p>
                <p className="fs-4"><span className="fw-bold">{splittedString[0]}</span><br/>{splittedString[1]}</p>
            </GreetingSection>
          </div>
          {/* <div className="col-md-"></div> */}
        </div>
        <div className="row">
            <div className="col-md-12">
                <ArticleSection>
                    <h2>Top Article </h2>
                    <hr />
                    {posts.length !== 0 ? posts.slice(0,3).map((v,idx)=>{
                        return(
                            <ArticleItem key={idx} id={v.id} judul={v.title} desc={v.content} penulis={v.author} image={v.image} />
                        )
                    }) : <p className="fs-5 text-center">Tidak ada data</p>}
                    <div className="d-flex justify-content-center">
                    {posts.length > 3 ? <Link to='./post' className="btn btn-primary">Lihat Selengkapnya</Link> : null}       
                    </div>
                </ArticleSection>
            </div>
        </div>
      </div>
    </>
  );
}
