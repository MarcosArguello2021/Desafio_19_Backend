import axios from 'axios';

export const getProductos = async () => {
  try {
    const { status, data } = await axios.get("http://localhost:3000/api/productos");
    return { status, data };
  } catch (err) {
    console.error(err);
  }
};

export const getProductoById = async(id) => {
  try {
      const { status, data } = await axios.get(`http://localhost:3000/api/productos/${id}`)
      return { status, data }
  } catch (error) {
      console.log(error)
  }
}


export const postProduct = async () => {
  const datos = {
    name: "axios prod",
    price: 6321,
    urlImage: "axios image",
    description: "axios description",
    code: 99999,
    stock: 333
}
  try {
    const  { status, data } = await axios.post(
      "http://localhost:3000/api/products",
      datos
    );

    return  { status, data };
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = async (id, datos) => {
  try {
    const  { status, data }  = await axios({
      method: "put",
      url: `http://localhost:3000/api/productos/${id}`,
      data: datos,
      // data: {
      // title: "Nuevo nombre de producto",
      // price: 100,
      // thumbnail: "",
      // stock: 0,
      // },
    });
    return  { status, data } ;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProduct = async (id) => {

  try {
    const  { status, data }  = await axios.delete(
      `http://localhost:3000/api/productos/${id}`
    );
    return  { status, data } ;
  } catch (err) {
    console.error(err);
  }
};
