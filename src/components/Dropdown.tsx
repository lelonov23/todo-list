import * as classes from "./Dropdown.module.css";

import { useState, useContext, useEffect } from "react";
import { PageContext } from "../App";

interface DropdownProps {
  onSelect: (id: number) => void;
  title: string;
  isListOpen: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  resetThenSet: (id: number) => void;
  list: CategorySelect[];
  isUpdate: boolean;
}
const Dropdown: React.FC<DropdownProps> = (props) => {
  const [headerTitle, setHeaderTitle] = useState(props.title);
  const [isListOpen, setIsListOpen] = props.isListOpen;
  const { selectList } = useContext(PageContext);

  const selectItem = (item: CategorySelect) => {
    const { onSelect, resetThenSet } = props;
    const { title, id } = item;
    setHeaderTitle(title);
    setIsListOpen(false);
    onSelect(id);
    resetThenSet(id);
  };

  useEffect(() => {
    if (props.isUpdate)
      for (let listItem of selectList) {
        if (listItem.selected && listItem.title !== headerTitle) {
          setHeaderTitle(listItem.title);
        }
      }
  }, []);

  return (
    <div className={classes.default.wrapper}>
      <div
        tabIndex={0}
        className={classes.default.header}
        onClick={() => setIsListOpen(!isListOpen)}
      >
        <div className={classes.default.headerTitle}>{headerTitle}</div>
        {isListOpen ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-angle-down"></i>
        )}
      </div>
      {isListOpen && (
        <div role="list" className={classes.default.list}>
          {props.list.map((item) => {
            let classList = `${classes.default.listItem}`;
            if (item.selected)
              classList = `${classes.default.listItem} ${classes.default.active}`;
            return (
              <button
                type="button"
                className={classList}
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  selectItem(item);
                }}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
