import { useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  deleteConstructorItem,
} from "../../services/reducers/constructorReducer";
import { useDispatch} from "../../services/store";
import type { Identifier, XYCoord } from 'dnd-core'
import { TElement } from "../../utils/types";

interface DragItem {
  id?: string
  element: TElement
  index: number
  moveElement: (dragIndex: number, hoverIndex: number) => void
  key?: string
}

const BurgerElement: FC <DragItem> = ({ id, element, index, moveElement}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "Element",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover (item:DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag] = useDrag({
    type: "Element",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const deleteConstructorElement = (e:TElement) => {  
    dispatch(deleteConstructorItem(e.key));
  };

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        //style={{ maxHeight: 80 }}
        text={element.name}
        key={element.key}
        price={element.price}
        thumbnail={element.image}
        //element={element}
        handleClose={() => deleteConstructorElement(element)}
      />
    </div>
  );
};

export default BurgerElement;