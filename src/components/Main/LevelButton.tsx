interface LevelButtonProps {
  level: string;
  isSelected: boolean;
  changeBackground: () => void;
}

const LevelButton = (props: LevelButtonProps) => {
  return (
    <>
      <button
        onClick={() => props.changeBackground()}
        className={
          props.isSelected ? "lvl-button-is-selected lvl-button" : "lvl-button"
        }
      >
        {props.level}
      </button>
    </>
  );
};

export default LevelButton;
