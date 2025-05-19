import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@presentation/components/ui/button";
import { Menu } from "@domain/menu/models/menu.model";

interface MenuNavigationProps {
  selectedMenu: Menu | null;
  menus: Menu[] | undefined;
  currentIndex: number;
  onPrevMenu: () => void;
  onNextMenu: () => void;
}

export const MenuNavigation = ({
  selectedMenu,
  menus,
  currentIndex,
  onPrevMenu,
  onNextMenu,
}: MenuNavigationProps) => {
  return (
    <div className="relative mb-6">
      <div className="flex items-center p-6 gap-6">
        {/* Flecha de navegación izquierda */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
          onClick={onPrevMenu}
          disabled={!menus || menus.length <= 1}
          aria-label="Menú anterior"
        >
          <ArrowLeft className="h-8 w-8" />
        </Button>

        <div className="h-24 w-24 bg-gray-200 rounded-md overflow-hidden mx-6">
          <img
            src={
              selectedMenu?.imageUrl
                ? selectedMenu.imageUrl + `?r=${Date.now()}`
                : "/default-menu.png"
            }
            alt={selectedMenu?.name || "Imagen de la carta"}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{selectedMenu?.name}</h3>
          <p className="text-gray-500 text-lg">{selectedMenu?.description}</p>
        </div>

        {/* Flecha de navegación derecha */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
          onClick={onNextMenu}
          disabled={!menus || menus.length <= 1}
          aria-label="Siguiente menú"
        >
          <ArrowRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Indicador de posición */}
      {menus && menus.length > 1 && (
        <div className="flex justify-center gap-1 pb-4">
          {menus.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
