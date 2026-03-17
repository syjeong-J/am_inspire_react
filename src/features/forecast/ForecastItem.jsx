import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  max-width: 400px;

  margin: 15px auto;
  padding: 20px 25px;

  background: white;
  border-radius: 12px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  font-size: 15px;
  color: #333;
  line-height: 1.6;

  transition: 0.25s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  }
`;

/* 제목 (선택사항) */
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #4a90e2;
`;


const ForecastItem = ({forecast}) => {
    return (
        <Card>
            <Title>예보정보</Title>
            {forecast.category}
        </Card>
        
    );
}

export default ForecastItem ;
