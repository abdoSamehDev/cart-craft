import { useState, useEffect } from "react";
import { productsApi } from "../utils/axios";
import { ProductData } from "../types/index"; // Import the ProductData type

export default function useFetch(
  params: string = "",
  query: string = "",
  sort: "asc" | "desc" | "" = "",
  category:string = "",
  tags: string = "",
  page: number = 1,
  limit: number = 10
): [ProductData[], boolean, number,string [],string []] {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]); 
  const fetchData = async () => {
    try {
      const res = await productsApi.get(`${params}`, {
        params: {
          q: query,
          skip: (page - 1) * limit,
          limit: limit,
        },
      });
      
      const categoryRes = await productsApi.get(``);
      setCategories(categoryRes.data.categories || []);

      let responseData: ProductData[] =  res.data.products

      const allCategories = [...new Set(responseData.map((product) => product.category))];
      const allTags = [...new Set(responseData.flatMap((product) => product.tags))];


      if (category) {
       
        const tagsForCategory = [...new Set(responseData
          .filter(product => product.category === category)
          .flatMap(product => product.tags))];
        setAllTags(tagsForCategory);
      } else {
        
        setAllTags(allTags);
      }

      if (sort) {
        responseData.sort((a, b) => {
          if (sort === "asc") return a.price - b.price; 
          if (sort === "desc") return b.price - a.price; 
          return 0;
        });
      }

      if (tags&&category) {
        responseData = responseData.filter((e) => e.tags.includes(tags));
      }
      if (category) {
        responseData = responseData.filter((e) => e.category.includes(category));
      }

      

      setTotalPosts(res.data.total);
      setData(responseData);

      setCategories(allCategories);
    
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(true)
  }, [query, sort,category, tags, page]);

  return [data, loading, totalPosts,categories,allTags];
}
