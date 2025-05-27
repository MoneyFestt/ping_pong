import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlayerName } from "../features/player/playerSlice";
import styles from "../styles/MenuResult.module.css";

type FormValues = {
  name: string;
};

const Menu: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(setPlayerName(data.name));
    navigate("/game");
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
        <br />
        <br />
        <button type="submit" className={styles.button}>
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Menu;
