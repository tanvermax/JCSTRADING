import Banners from "@/components/layout/HomeLayout/Banners";
import Flashsale from "@/components/layout/HomeLayout/FlashSale/Flashsale";
import NewProduct from "@/components/layout/HomeLayout/NewProduct/NewProduct";
import TopBrands from "@/components/layout/HomeLayout/Topbrands/TopBrands";
import TradingProduct from "@/components/layout/HomeLayout/TrandingProduct/TradingProduct";







export default function Home() {
  


  return (
    <div>
      <Banners />
     <Flashsale/>
     <TopBrands/>
     <TradingProduct/>
     <NewProduct/>

    </div>
  );
}