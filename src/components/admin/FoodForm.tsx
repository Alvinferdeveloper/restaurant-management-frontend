import { useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import supabase from "@/lib/supabase";
import { gql, useMutation } from "@apollo/client";

const GET_URL = `
    mutation FILE($filename: String!){
    getSignedUrl(filename: $filename){
      signedUrl
      token
    }
 }
`
const ADD_FOOD = gql`
  mutation Food($foodInput: FoodInput){
  addFood(foodInput: $foodInput) {
    name
  }
}
`

const fetchSignedUrl = async (imageName: string) => {
  const res = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_URL,
      variables: {
        filename: imageName
      }
    })
  });

  const json = await res.json();
  return { token: json.data.getSignedUrl.token };
}
export default function FoodForm() {
  const [imagen, setImagen] = useState<File | null>();
  const [open, setOpen] = useState(false)
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [ addFoodMutation] = useMutation(ADD_FOOD);
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    price: 0,
    preparation_time: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagen(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar los datos y la imagen a tu backend
    if (!imagen) {
      alert("Seleccione una imagen");
      return;
    }
    const newImageName = imagen.name.concat(Date.now().toString());
    const { token } = await fetchSignedUrl(newImageName);
    const { data, error } = await supabase.storage.from('food').uploadToSignedUrl(`image/${newImageName}`, token, imagen);
    if (!error) {
      addFoodMutation({ variables: { foodInput: { ...formData, price: Number(formData.price), preparation_time:Number(formData.preparation_time), image: data?.path }}});
    }
    
    setOpen(false)
    setFormData({ name: '', ingredients: '', price: 0, preparation_time: 0 })
    setImagen(null)
    setImagenPreview(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar Comida</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Comida</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">name de la comida</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredientes">Ingredientes</Label>
            <Textarea
              id="ingredientes"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiempoPreparacion">Tiempo de preparación (minutos)</Label>
            <Input
              id="tiempoPreparacion"
              name="preparation_time"
              type="number"
              value={formData.preparation_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imagen">Imagen de la comida</Label>
            <Input
              id="imagen"
              name="imagen"
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              Seleccionar imagen
            </Button>
            {imagenPreview && (
              <div className="mt-2">
                <img src={imagenPreview} alt="Vista previa" className="w-auto h-20" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">Guardar Comida</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}