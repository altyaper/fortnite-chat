import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { WHITE, SMOKE, LIGHT_GREY } from '../../constants/colors';
import hiIcon from '../../images/hand-solid.svg'

const TopBarWrapper = styled.div`
  background-color: ${WHITE};
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  padding: 10px;
  display: flex;
`

const Icon = styled.img`
  width: 90px;
  fill: 'red';
`;

const OptionButton = styled.button`
  background-color: transparent;
  border: 0;
  margin: 0 10px;
  transition: all 0.2s ease;

  &:hover {
    background-color: red;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  margin-left: auto;
`

const Input = styled.input`
  flex: 1;
  border: 1px solid ${LIGHT_GREY};
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
  background-color: ${SMOKE};
  padding: 10px 10px;
  font-size: 34px;
`

const TopBar = ({
  onOptionSelected
}) => {

  const [ inputValue, setInputValue ] = useState('');

  const onInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  }

  return (
    <TopBarWrapper>
      <Input type='text' onChange={onInputChange} value={inputValue} />
      <OptionsWrapper>
        <OptionButton onClick={() => onOptionSelected(1)}>
          <Icon src={hiIcon} />
        </OptionButton>
      </OptionsWrapper>
    </TopBarWrapper>
  )
}

TopBar.propTypes = {
  onOptionSelected: PropTypes.func.isRequired
};

export default TopBar;