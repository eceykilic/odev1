import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

export default function ErrorPage() {
  const history = useHistory();

  return (
    <div className="error-container">
      <h2>Siteye giriş için lütfen tekrar deneyiniz</h2>
      <Button color="light" onClick={() => history.push('/')}>
        Kodu tekrar dene
      </Button>
    </div>
  );
}
