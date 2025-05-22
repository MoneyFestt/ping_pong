import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlayerName } from "../features/player/playerSlice"; // створимо далі
import styles from "../styles/MenuResult.module.css";

function Menu() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(setPlayerName(data.name)); // збереження імені
    navigate("/game"); // перехід до гри
  };

  return (
    <div className={styles.centeredContainer}>
      <h1 className={styles.title}>Ping Pong Game</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
       <input
        type="text"
        placeholder="Enter your name"
        className={styles.input}
        {...register("name", { required: true })}
        />

        <br /><br />
        <button type="submit" className={styles.button}>
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Menu;
