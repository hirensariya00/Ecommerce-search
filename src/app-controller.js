import { useState } from "react";

const useAppController = () => {
  const [productList, setProductList] = useState([]);
  const [searchData, setSearchData] = useState("")
  const searchProductsFieldsToQuery = [
    "images_ej",
    "price_efi",
    "retail_price_ef",
    "custom_url",
    "page_slug_esi",
    "brand_esi",
    "brand_page_slug_esi",
    "calculated_price_efi",
    "sale_price_efi",
    "sku_for_analytics_esli",
  ];

  const getProductListData = async function searchExperro() {
    try {
      const response = await fetch(
        `https://apis.experro-dev.app/ecommerce-service/public/v1/search?fieldsToQuery=${searchProductsFieldsToQuery.join()}&skip=0&limit=10&sort_by=relevance&isAuto=false`,
        {
          body: JSON.stringify({
            search_terms: searchData,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            /*'x-tenant-id': _experro_.TENANT_ID,
            'x-workspace-id': _experro_.WORKSPACE_ID,
            'x-env-id': _experro_.ENVIRONMENT_ID,
            'x-workspace-hash': _experro_.STORE_LINK,*/
            "x-domain": "xxlz2587.myexperro-dev.com",
          },
        }
      );
      const data = await response.json();
      const tempArray = [];
      for (let i = 0; i < data.Data.items.length; i++) {
        let images = "";
        if (data.Data.items[i]["images_ej"]) {
          const imageData = JSON.parse(data.Data.items[i]["images_ej"]).find(
            (i) => i.is_thumbnail
          );
          if (imageData && Object.keys(imageData).length > 0) {
            images = imageData.url_standard;
          }
        }
        tempArray.push({
          name: data.Data.items[i].name_eti,
          price: data.Data.items[i].calculated_price_efi
            ? data.Data.items[i].calculated_price_efi
            : 0,
          images: images,
        });
      }
      setProductList([...tempArray]);
      return {
        status: response.status,
        data,
        headers: response.headers,
      };
    } catch (error) {
      console.error("test", error);
      return false;
    }
  };

  const onSearchDataChange = (e) => {
    setSearchData(e.target.value);
    getProductListData();
  };
  return { productList, onSearchDataChange, searchData };
};
export default useAppController;
