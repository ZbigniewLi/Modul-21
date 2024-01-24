import ResultBox from './ResultBox';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';


  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    const testCases = [
        { amount: 100,convertedAmount:convertPLNToUSD(100) },
        { amount: 20,convertedAmount:convertPLNToUSD(20) },
        { amount: 200,convertedAmount:convertPLNToUSD(200) },
        { amount: 345, convertedAmount:convertPLNToUSD(345) },
      ];
  
      for (const testObj of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN '+testObj.amount+'.00 = '+testObj.convertedAmount);
      });
    }

    const USDCases = [
        { amount: 100,convertedAmount:convertUSDToPLN(100) },
        { amount: 20,convertedAmount:convertUSDToPLN(20) },
        { amount: 200,convertedAmount:convertUSDToPLN(200) },
        { amount: 345, convertedAmount:convertUSDToPLN(345) },
      ];
  
      for (const testObj of USDCases) {
    it('should render proper info about conversion when USD -> PLN', () => {
        render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('$'+testObj.amount+'.00 = '+testObj.convertedAmount);
      });
    }

    it('should render proper info when from and to are the same', () => {
        render(<ResultBox from="PLN" to="PLN" amount={123} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
      });


    it('should render "Wrong value..." for negative amount', () => {
        render(<ResultBox from="PLN" to="USD" amount={-50} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');
      });
});

