import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ArticleSection } from "../../pages/Home/style";
import { motion } from "framer-motion";

export default function ArticleItem(props) {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const deleteFunc = async () => {
    let tanya = window.confirm(
      `Apakah anda yakin akan menghapus ${props.judul} ?`
    );
    if (!tanya) return;
    const response = await axios.delete(
      `https://jcc.brandingyou.id/api/post/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.meta.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editFunc = () => {
    navigate(`./edit/${props.id}`);
  };
  return (
    <motion.div className="d-flex gap-3 mb-5 mt-5" initial={{opacity:0, y:'-5vh'}} animate={{opacity:1, y:0}} transition={{duration:0.8}}>
      {/* <ToastContainer /> */}
      <img
        src={props.image}
        alt=""
        style={{ width: "10rem", height: "10rem", objectFit:'cover' }}
      />
      <div className="d-flex flex-column">
        {/* <p>{props.id}</p> */}
        <p className="fs-3 fw-bold">{props.judul}</p>
        <p className="fs-5">Penulis : {props.penulis}</p>
        <p className="fs-4">{props.desc}</p>
        <div className="d-flex gap-3 w-100">
          <button className="btn btn-info" onClick={editFunc}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={deleteFunc}>
            Hapus
          </button>
        </div>
      </div>
    </motion.div>
  );
}
ArticleItem.defaultProps = {
  judul: "Ini judul ya",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ullam quibusdam dignissimos rem eaque deserunt amet distinctio magnam similique? Quis reprehenderit laudantium obcaecati ipsa rerum. Ex voluptate deleniti autem dicta.",
};

export function EditPost() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate()
  const [newData, setnewData] = useState({
    judul: "",
    desc: "",
    image: "",
  });
  const [isEdit, setisEdit] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`https://jcc.brandingyou.id/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setnewData(res.data.data);
          setisEdit(true);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (isEdit) {
      document.getElementById("judul").value = newData.title;
      document.getElementById("deskripsi").value = newData.content;
    }
  });

  const editSubmit = async() =>{
    let tanya = window.confirm(
        `Apakah anda yakin ?`
      );
      if (!tanya) return;
      const formData = new FormData();
      formData.append('title', newData.title)
      formData.append('content', newData.content)
      formData.append('image', newData.image)
      const response = await axios.post(
        `https://jcc.brandingyou.id/api/post/${id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log(response)
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
      setTimeout(()=>{
        navigate('../../dashboard/post')
      })
  }
  return (
    <>
      <ArticleSection>
        <div className="row">
          <div className="col-md-12">
            <h1>Edit Data</h1>
            <hr />
            <motion.form
              className="mb-5"
              onSubmit={(e) => e.preventDefault()}
              id="form-tambah"
            >
              <div className="mb-3">
                <label htmlFor="" className="label">
                  Judul
                </label>
                <input
                  type="text"
                  placeholder="Apa judul yang pas untuk postingan ini ?"
                  id="judul"
                  className="form-control"
                  onChange={(e) =>
                    setnewData((newData) => ({
                      ...newData,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="label">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Apa hal terabsurd yang sedang anda pikirkan ?"
                  id="deskripsi"
                  className="form-control"
                  onChange={(e) =>
                    setnewData((newData) => ({
                      ...newData,
                      content: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="label">
                  Gambar
                </label>
                <small className="d-block">
                  <span style={{ color: "red" }}>*</span>Kosongkan jika tidak
                  ingin diupdate
                </small>
                <input
                  type="file"
                  className="form-control"
                  id="gambar"
                  onChange={(e) =>
                    setnewData((newData) => ({
                      ...newData,
                      image: e.target.files[0],
                    }))
                  }
                  accept="image/*"
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={editSubmit}>Edit Post Sekarang!</button>
              </div>
            </motion.form>
          </div>
        </div>
      </ArticleSection>
    </>
  );
}
