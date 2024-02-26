import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";
import { ref, query, orderByChild, onValue } from "firebase/database";
import { database } from "../../../config/firebase";
import { Item } from "./ItemsTable";
import Masonry from "@mui/lab/Masonry";

const ItemCardTab = () => {
  const USERNAME = "matthew";
  const rootRef = ref(database, `items/${USERNAME}`);
  const itemsRef = query(rootRef, orderByChild("category"));
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const unsub = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const dataItems = Object.values(data) as Item[];
      const uniqueItemCategories = new Set(
        dataItems.map((dataItem) => dataItem.category)
      );

      const uniqueCategories = [...uniqueItemCategories];
      console.log("categories", uniqueCategories);
      if (JSON.stringify(categories) !== JSON.stringify(uniqueCategories)) {
        setCategories([...uniqueItemCategories]);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Masonry columns={4} spacing={2}>
      {...categories
        .sort()
        .map((category) => <ItemCard categoryName={category} key={category} />)}
    </Masonry>
  );
};

export default ItemCardTab;
