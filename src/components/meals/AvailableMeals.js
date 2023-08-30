import styles from "./AvailableMeals.module.css";
import Card from "../ui/Card";
import MealItem from "./meal-item/MealItem";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);

  const transformMeals = (meals) => {
    const loadedMeals = [];
    for (const key in meals) {
      loadedMeals.push({
        id: key,
        name: meals[key].name,
        description: meals[key].description,
        price: meals[key].price,
      });
    }
    setMeals(loadedMeals);
  };

  const requestConfig = { path: "meals.json" };

  const { isLoading, error: httpError, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    fetchMeals(requestConfig, transformMeals);
  }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
