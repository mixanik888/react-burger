import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export const BurgerElement = ({ id, element, index, moveElement, deleteConstructorElement }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "Element",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveElement(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "Element",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
        <DragIcon type="primary" className={drag}/>
        <ConstructorElement
            style={{ maxHeight: 80 }}
            text={element.name}
            key={element.key}
            price={element.price}
            thumbnail={element.image}
            element={element}
            handleClose={ (() => deleteConstructorElement(element.key))}
        />
    </div>
  )
}

BurgerElement.propTypes = {
    moveElement: PropTypes.func.isRequired,
    deleteConstructorElement: PropTypes.func.isRequired
  }