import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

export default function SkeletonProducts() {
  const arr = new Array(12).fill(true);
  return (
      <Grid container spacing={5}>
          {
              arr.map((item, i) => {
                  return (
                      <Grid item xs={6} sm={3} key={i}>
                          <Skeleton variant="rect" height={200} />
                          <Skeleton variant="text" />
                          <Skeleton variant="text" />
                          <Skeleton variant="text" />
                      </Grid>
                  )
              })
          }
      </Grid>
  );
}