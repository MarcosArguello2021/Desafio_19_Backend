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
      "http://localhost:3000/api/productos",
      datos
    );

    return  { status, data };
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = async (id) => {
  const datos = {
    name: "axios prod",
    price: 123,
    urlImage: "axios image",
    description: "axios description",
    code: 123,
    stock: 200
}

  try {
    const  { status, data }  = await axios.put(`http://localhost:3000/api/productos/${id}`,
      datos
    );
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
