#!/bin/sh

se2244 login --username Admin --password 123 
echo "---------------------------------------------------------------------------"
se2244 healthcheck
echo "---------------------------------------------------------------------------"
se2244 questionnaire --questionnaire_id QQ000 --format json
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id P00 --session_id WZYX --option_id email@gmail.com
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id P01 --session_id WZYX --option_id P01A1
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q01 --session_id WZYX --option_id Q01A2
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q02 --session_id WZYX --option_id Q02A2
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q04 --session_id WZYX --option_id Q04A1
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q05 --session_id WZYX --option_id Q05A2
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q07 --session_id WZYX --option_id Q07A2
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q08 --session_id WZYX --option_id Q08A1
echo "---------------------------------------------------------------------------"
se2244 doanswer --questionnaire_id QQ000 --question_id Q09 --session_id WZYX --option_id Q09A1
echo "---------------------------------------------------------------------------"
se2244 getquestionanswers --questionnaire_id QQ000 --question_id Q01 --format json
echo "---------------------------------------------------------------------------"
se2244 resetall
echo "---------------------------------------------------------------------------"
se2244 questionnaire_upd --source ../api-backend/dummy_data/example5.json
echo "---------------------------------------------------------------------------"
se2244 questionnaire --questionnaire_id QQ000 --format json