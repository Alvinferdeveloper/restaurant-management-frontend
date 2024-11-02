import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Utensils, Check, PartyPopper } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function OrderConfirmation() {
  const navigate = useNavigate();
  return (
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-orange-600 dark:text-orange-400">
              ¡Pedido Realizado con Éxito!
            </DialogTitle>
            <DialogDescription className="text-center">
              <div className="flex justify-center my-4">
                <div className="relative">
                  <Utensils className="w-20 h-20 text-orange-500 dark:text-orange-400" />
                  <Check className="w-8 h-8 text-green-500 absolute bottom-0 right-0" />
                </div>
              </div>
              <p className="text-lg font-medium mt-4 mb-2">
                ¡Excelente elección!
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Su pedido se ha realizado con éxito. Pronto tendrá su deliciosa comida en la mesa.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <PartyPopper className="w-12 h-12 text-yellow-500 animate-bounce" />
          </div>
          <DialogFooter>
            <Button onClick={() => navigate('/User/Tables')} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              ¡Entendido, gracias!
            </Button>
          </DialogFooter>
        </DialogContent>
  )
}