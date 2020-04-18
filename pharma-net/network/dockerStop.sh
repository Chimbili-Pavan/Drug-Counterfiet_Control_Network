echo $' ******   *****\n  '
echo $'  ------Shutting down the docker conatiners  -------\n'


# stop & clear the any containers if existed
docker stop $(docker ps -a -q)

echo $' ******   *****\n  '
echo $'  ------ containers are stopped  -------\n'


docker rm $(docker ps -a -q)

echo $' ******   *****\n  '
echo $'  ------ containers are removed  -------\n'


# check the empty containers
docker ps -a

docker volume rm $(docker volume ls -qf dangling=true)
