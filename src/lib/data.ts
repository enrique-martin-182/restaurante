import type { Restaurant, Menu, Dish } from "./types";
import restaurantData from "../../data/restaurant.json";
import menuData from "../../data/menu.json";

export function getRestaurant(): Restaurant {
  return restaurantData as Restaurant;
}

export function getMenu(): Menu {
  return menuData as Menu;
}

export function getDishesByCategory(categoryId: string): Dish[] {
  return (menuData as Menu).dishes.filter((d) => d.category === categoryId);
}

export function getFeaturedDishes(): Dish[] {
  return (menuData as Menu).dishes.filter((d) => d.featured);
}
