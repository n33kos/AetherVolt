export default orig => Object.assign( Object.create( Object.getPrototypeOf(orig)), orig)
