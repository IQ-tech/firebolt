const If = ({ condition, renderIf, renderElse = null }) => {
	return condition ? renderIf : renderElse
}

export default If
