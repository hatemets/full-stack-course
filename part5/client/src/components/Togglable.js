import { forwardRef, useImperativeHandle, useState } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? "" : "none" }
    const hideWhenVisible = { display: visible ? "none" : "" }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                { children }
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable
