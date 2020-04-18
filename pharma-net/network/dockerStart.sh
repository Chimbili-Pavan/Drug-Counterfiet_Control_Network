
echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ checking if any conatiners running  -------\n'


# stop & clear the any containers if existed
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
#docker rmi -f $(docker images -a -q)

# check the empty containers
docker ps -a

echo $'                                             \n  '
echo $'                                             \n  '
echo $'  ------ Starting the docker containers  -------\n'

# start the docker contianers
docker-compose -f ./docker-compose.yml up -d

#started the docker
echo $'*******   ******\n'
echo $' -----   Docker containers have started  ------\n'

#confirm that containers are started
docker ps -a

echo $'                                             \n  '

echo $' -----   Docker containers are started  ------\n'
