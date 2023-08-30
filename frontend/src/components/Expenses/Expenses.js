import { styled } from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';

const Expenses = () => {
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
`;

export default Expenses