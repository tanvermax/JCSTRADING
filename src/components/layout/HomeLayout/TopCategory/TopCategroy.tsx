// TopCategory.jsx

const categoriesData = [
  { "name": "Exterior Accessories", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Car-Exterior-Accessories-768x768.webp" },
  { "name": "Performance", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/045ec464-0547-42c3-848a-70ec553cceba-modified.png.webp" },
  { "name": "Safety & Emergency", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/d1be2013-b496-431f-b7e0-e8c73edf04b1-modified.png.webp" },
  { "name": "Interior Accessories", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Car-Interior-Accessories-768x768.webp" },
  { "name": "Car Tissue Box", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Car-Tissue-Box.webp" },
  { "name": "Phone Accessories", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Phone-Accessories-768x768.webp" },
  { "name": "Perfume & Showpiece", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Car-Perfume-Showpiece-768x768.webp" },
  { "name": "Modifications", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/3bcc0f12-c2b8-49ad-a7c1-8d048801d4c9-modified.webp" },
  { "name": "Paint Protection Films", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/dd520069-9480-4b41-946d-e86e9b664d7d-modified.png.webp" },
  { "name": "Tools & Equipment", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Tools-Equipment-768x768.webp" },
  { "name": "Car Spare Parts", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/f96f396e-e36a-4ee8-8736-86bf409267f3-modified.png.webp" },
  { "name": "Floor Mats & Carpet", "photoUrl": "https://modymart.com/wp-content/uploads/2024/05/Car-Floor-Mats-Carpet-768x768.webp" },
  { "name": "Car Covers", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/7b8b6be1-ae82-4e2a-abc1-fefe7ebd13c5-modified.png.webp" },
  { "name": "LED & Lighting", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/8bbd7052-574b-4073-bc59-60025870ffb9-modified.png.webp" },
  { "name": "Car Care", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/1c00a65a-fa95-4f45-93a5-7a27db8e4ba0-modified.png.webp" },
  { "name": "Utilities", "photoUrl": "https://modymart.com/wp-content/uploads/2025/09/02373831-0c53-4212-8afb-784db57dbf4c-modified.png.webp" }
];
export default function TopCategroy() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="md:text-3xl text-xs font-extrabold  text-center mb-10 md:border-b-4 border-b-2 border-[#FF781A] inline-block ">
            Explore Top Categories
        </h2>
        
        {/* Grid Container */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
            {categoriesData.map((category) => (
                <div 
                    key={category.name} 
                    className="flex flex-col items-center p-3 sm:p-4  rounded-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer"
                >
                    {/* Image Circle */}
                    <div className="w-14 h-14 sm:w-24 sm:h-24 mb-3 rounded-full overflow-hidden border-4 border-gray-100 flex-shrink-0">
                        <img 
                            src={category.photoUrl} 
                            alt={category.name} 
                            // w-full, h-full, and object-cover ensure the image fills the circle
                            className="w-fullh-full "
                        />
                    </div>
                    
                    {/* Category Name */}
                    <p className="text-[10px] sm:text-sm font-semibold text-gray-700 text-center leading-tight">
                        {category.name}
                    </p>
                </div>
            ))}
        </div>
    </div>
  );
}