import StarMatch from '../components/StarMatch';
import {
  Paper,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';

export default function MiniGame() {
  return (
    <>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: '100vh', backgroundColor: '#192d3e' }}
      >
        <Container maxWidth="sm">
          <Grid item xs={12}>
            <Typography
              variant="h1"
              style={{
                textAlign: 'center',
                color: '#eeeeee',
                fontFamily: 'Arial',
              }}
            >
              Star Match
            </Typography>
          </Grid>
          <Grid item xs>
            <Paper
              elevation={3}
              style={{ backgroundColor: '#122230', padding: '20px' }}
            >
              <StarMatch />
            </Paper>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
