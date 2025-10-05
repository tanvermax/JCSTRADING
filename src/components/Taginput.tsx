import { XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface TagProps extends React.PropsWithChildren {
  // Use the variant type from your Badge component for safety
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'; 
  onDelete: () => void; // A function to call when the tag is deleted
}
export default function Taginput({ children, variant = "outline", onDelete }: TagProps) {
 


  return (
    <Badge  variant={variant} className="gap-0 rounded-md px-2 py-1">
     {children} 
      <button
        className="focus-visible:border-ring focus-visible:ring-ring/50 text-foreground/60 hover:text-foreground -my-[5px] -ms-0.5 -me-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={onDelete}
        aria-label="Delete"
      >
        <XIcon size={14} aria-hidden="true" />
      </button>
    </Badge>
  )
}
