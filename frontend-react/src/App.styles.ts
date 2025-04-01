import styled from 'styled-components'

export const AppWrapper = styled.div`
	position: relative;
	z-index: 9;
	display: flex;
	text-align: center;
	background-color: ${(props) => props.theme.colors.background};
`
