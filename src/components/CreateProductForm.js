import React, { useRef, useState } from "react";
import httpRequest from "../services/httpRequest";
function CreateProductForm() {
  const [productItems, setProductItems] = useState([
    { qtyInStock: "", image: null, colorId: "" },
  ]);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    categoryId: "",
    description: "",
    price: "",
    providerId: "",
  });
  const handleProductItemChange = (index, field, value) => {
    const updatedItems = [...productItems];
    updatedItems[index][field] = value;
    setProductItems(updatedItems);
  };
  const handleProductChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const refProduct = useRef();
  const addProductItem = () => {
    setProductItems((prev) => [
      ...prev,
      { qtyInStock: "", image: "", colorId: "" },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Gửi dữ liệu form đi và xử lý tại đây

    const files = productItems.map((item) => item.image);
    const filenames = await handleFiles(files);

    productItems.forEach((item, index) => {
      item.image = filenames[index];
      item.qtyInStock = parseInt(item.qtyInStock);
    });
    product.image = productItems[0].image;
    product.price = parseInt(product.price);
    product.providerId = "0e13fc37-6db2-4f44-933d-28cc9c2814d4";

    const newProduct = { ...product, productItems };
    console.log(newProduct);
    const { data } = await httpRequest.post("/products", newProduct);
    console.log(data);
  };
  const handleFiles = async (files) => {
    var formData = new FormData();
    files.forEach((file) => {
      formData.append("multiple", file);
    });
    const { data } = await httpRequest.post("/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.data.map((file) => file.filename);
  };
  return (
    <div className="container">
      <h1>Tạo sản phẩm mới</h1>
      <form id="createProductForm" ref={refProduct}>
        <label for="name">Tên sản phẩm:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={product.value}
          required
          onChange={handleProductChange}
        />
        <br />

        <label for="categoryId">danh mục:</label>
        <select required name="categoryId" onChange={handleProductChange}>
          <option value="" selected disabled hidden>
            Chọn danh mục
          </option>
          <option value="1636e9b8-03e1-4bec-8d19-b2aea0cf13f4">IPhone</option>
          <option value="445362d2-3525-49aa-89f8-d4cb32735283">IPad</option>
          <option value="4f8ae939-22f2-43b1-bbd4-76331a99e3ec">Mac</option>
        </select>

        <br />
        <label for="categoryId">Nhà cung cấp</label>
        <select required name="providerId" onChange={handleProductChange}>
          <option value="" selected disabled hidden>
            Nhà cung cấp
          </option>
          <option value="0e13fc37-6db2-4f44-933d-28cc9c2814d4">Samsung</option>
          <option value="a7c8a31d-b01f-4c36-bd47-d971c9525bab">Oppo</option>
          <option value="a97a963f-4075-4924-9e35-36b7b0f2cad6">Xiaomi</option>
          <option value="c532f3bc-c151-4b91-ba24-d47f073f44e5">Apple</option>
        </select>

        <br />
        <label for="description">Mô tả:</label>
        <textarea
          id="description"
          name="description"
          required
          value={product.description}
          onChange={handleProductChange}
        ></textarea>
        <br />
        <label for="price">Giá:</label>
        <input
          type="number"
          id="price"
          value={product.price}
          name="price"
          required
          onChange={handleProductChange}
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Tạo sản phẩm
        </button>
        <br />
        <label>Sản phẩm con:</label>
        <div>
          {productItems.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Số lượng sản phẩm con"
                value={item.qtyInStock}
                onChange={(e) =>
                  handleProductItemChange(index, "qtyInStock", e.target.value)
                }
                required
              />
              <input
                type="file"
                placeholder="Ảnh sản phẩm con"
                onChange={(e) => {
                  handleProductItemChange(index, "image", e.target.files[0]);
                }}
                required
              />
              <label for="categoryId">Màu sản phẩm</label>
              <select
                required
                onChange={(e) =>
                  handleProductItemChange(index, "colorId", e.target.value)
                }
              >
                <option value="" selected disabled hidden>
                  Chọn màu
                </option>
                <option value="1e63c943-903e-4a33-88a5-a01f983d1499">
                  Red
                </option>
                <option value="e069517b-e3f5-41f3-9a59-f1b195f62ffc">
                  Yellow
                </option>
                <option value="f399ee56-584d-44aa-a8ad-26ef229c8e3c">
                  Gray
                </option>
              </select>
            </div>
          ))}
        </div>
        <button type="button" onClick={addProductItem}>
          Thêm sản phẩm con
        </button>
        <br />
      </form>
    </div>
  );
}

export default CreateProductForm;
