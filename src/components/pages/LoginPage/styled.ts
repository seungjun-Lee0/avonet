import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  padding: 30px;
  min-width: 370px;
  max-width: 450px;
  width: 80%;
  position: relative;
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
`;

export const Tab = styled.h2<{ active?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => (props.active ? '#0d0d0d' : '#cccccc')};
  border-bottom: ${props => (props.active ? '2px solid #5fbae9' : 'none')};
  margin: 40px 8px 10px 8px;
  cursor: pointer;
`;

export const Icon = styled.div`
  width: 100%;
  img {
    width: 30%;
  }
`;

export const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px;
  font-size: 16px;
  width: 300px;
  margin: 5px;
  border: 2px solid #f6f6f6;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;

  &:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
  }
`;

export const SubmitButton = styled.input`
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  width: 333px;
  margin: 4px 0;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #39ace7;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ForgotPassword = styled.div`
  padding: 25px;
  text-align: center;
  border-radius: 0 0 10px 10px;
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  button {
    background: none;
    border: none;
    color: #007bff;
  }
`;
