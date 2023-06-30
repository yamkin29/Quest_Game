using System;
using System.Threading.Channels;

namespace Quest_Game
{
    class Program
    {
        private static int _roomNumber = 1;
        private static bool _hasKey = false;
        private static bool _hasModule = false;
        private static bool _finish = false;

        static void Main(string[] args)
        {
            Introduction();

            while (true)
            {
                if (_roomNumber == 1)
                    ActionStarShip();
                if (_roomNumber == 2)
                    ActionTemple();
                if (_roomNumber == 3)
                    ActionLivingRoom();
                if (_roomNumber == 4)
                    ActionDangerRoom();
                if (_roomNumber == 5)
                    ActionQuestRoom();
                if (_roomNumber == 6)
                    ActionOtherShip();
            }
        }

        static void ActionStarShip()
        {
            Console.Clear();
            Console.WriteLine("Ты находишься внутри своего F-5 Starlight");
            Console.WriteLine("Тебе нужно топливо и, очевидно, что искать его нужно не тут");
            Console.WriteLine("Доступные действия:");
            Console.WriteLine("1. Выйти из корабля");
            int option;

            if (_hasModule)
            {
                Console.WriteLine("2. Свалить с планеты");
                option = GetIntInRange(2);
            }
            else
            {
                option = GetIntInRange(1);
            }

            if (option == 1)
            {
                Console.WriteLine("Ты выходишь из корабля");
                _roomNumber = 2;
                Console.ReadLine();
            }
            else if (option == 2)
            {
                Conclusion();
            }
        }

        static void ActionTemple()
        {
            Console.Clear();
            Console.WriteLine("Ты находишься в просторном каменном зале");
            Console.WriteLine("Перед тобой дверь, из-за которой виден свет");
            Console.WriteLine("Справа от нее другая дверь, выглядит так, будто ей давно никто не пользовался");
            Console.WriteLine("Доступные действия:");
            Console.WriteLine("1. Вернуться на корабль.");
            Console.WriteLine("2. Зайти в дверь, откуда виден свет.");
            Console.WriteLine("3. Подойти к двери справа.");
            int option = GetIntInRange(3);

            if (option == 1)
            {
                Console.WriteLine("Идем обратно на корабль.");
                _roomNumber = 1;
                Console.ReadLine();
            }
            else if (option == 2)
            {
                Console.WriteLine("Ты идешь к двери со светом и заходишь внутрь");
                _roomNumber = 3;
                Console.ReadLine();
            }
            else if (option == 3)
            {
                OpenOldDoor();
            }
        }

        static void OpenOldDoor()
        {
            Console.WriteLine("Ты подпошел к двери справа. От нее как будто веет холодом.");
            Console.WriteLine("На двери висит замок. (Замочная скважина треугольной формы)");

            if (!_hasKey)
            {
                Console.WriteLine("Пытаешься открыть дверь, но это тщетно. Замок у ее ручки, очевидно, против этого");
                Console.WriteLine("Найти бы ключ от замка...");
                Console.WriteLine("Возможно нужно осмотреть другие помещения");
                Console.WriteLine("Возвращаемся в центр зала");
            }
            else
            {
                Console.WriteLine("Не долго думая, ты достаешь ключ, найденный ранее.");
                Console.WriteLine("Замок со скрипом поддается и ты проходишь внутрь");
                _roomNumber = 4;
            }

            Console.ReadLine();
        }

        static void ActionLivingRoom()
        {
            Console.Clear();
            Console.WriteLine("Открыв дверь, ты попал в маленькое помещение, похожее на чулан.");
            Console.WriteLine("Слева пылает камин... Тут явно кто-то был");
            Console.WriteLine("Причем, совсем недавно...");
            Console.WriteLine("Здесь явно есть что-то интересное...");
            int option;
            Console.WriteLine("Доступные действия:");
            Console.WriteLine("1. Вернуть обратно в зал");

            if (!_hasKey)
            {
                Console.WriteLine("2. Обыскать помещение");
                option = GetIntInRange(2);
            }
            else
            {
                option = GetIntInRange(1);
            }

            if (option == 1)
            {
                Console.WriteLine("Возвращаемся обратно...");
                _roomNumber = 2;
                Console.ReadLine();
            }
            else
            {
                Console.WriteLine("В течение нескольких (возможно десятков) минут ты обследуешь все помещение");
                Console.WriteLine("Кроме какой-то мебели и тряпок ничего интересного нет, хотя...");
                Console.WriteLine("Рядом с камином ты видишь что-то блестящее, и, не задумываясь, двигаешься к нему");
                Console.WriteLine("Ты нашел како-то ключ... Вот только от чего он?");
                _hasKey = true;
                Console.ReadLine();
            }
        }

        static void ActionDangerRoom()
        {
            Console.Clear();
            Console.WriteLine("Как только ты вошел в комнату, то сразу почуствовал себя неуютно");
            Console.WriteLine("Отсюда хочеться поскорее сбежать. Все твое нутро говорит тебе об этом");
            Console.WriteLine("В этом помещении очень темно. Однако, ты будто видишь в далеке луч света...");
            Console.WriteLine("Доступные действия:");
            Console.WriteLine("1. Вернуться обратно в каменный зал");
            Console.WriteLine("2. Добежать до света");
            Console.WriteLine("3. Обследовать темные углы этого помещения");
            int option = GetIntInRange(3);

            if (option == 1)
            {
                Console.WriteLine("Возваращаемся обратно...");
                _roomNumber = 2;
                Console.ReadLine();
            }

            else if (option == 2)
            {
                Console.WriteLine("Подойдя ближе к свету, ты понял, что этот свет исходит из двери");
                Console.WriteLine("В этом темном зале тебе было не по себе. Недолго думая, ты заходишь внутрь");
                _roomNumber = 5;
                Console.ReadLine();
            }
            else
            {
                Death();
            }
        }

        static void Death()
        {
            Console.WriteLine("Дойдя до темных частей зала, тебя охватывает дрожь по всему телу");
            Console.WriteLine("В этой темной бездне точно что-то скрыто и оно будто движется к тебе...");
            Console.WriteLine("Ты пытаешься бежать обратно, но страх так силен, что ты едва сумел развернуться");
            Console.WriteLine("Хотя, это уже не имеет значения. Какое-то существо быстро приближается к тебе сзади...");
            Console.WriteLine("Ты понимаешь, что это конец...");
            Console.WriteLine("Надо было слушать свою интуицию...");
            Console.ReadLine();
            Environment.Exit(0);
        }

        static void ActionQuestRoom()
        {
            Console.Clear();
            Console.WriteLine("А в этом зале довольно уютно");
            Console.WriteLine("Зал небольшой, спереди находится какая-то дверь со странным замком");
            Console.WriteLine("На стенах что-то написано красной серебристого цвета...");
            Console.WriteLine("Доступные действия:");
            Console.WriteLine("1. Вернуться обратно в страшный зал");
            Console.WriteLine("2. Подойти к двери с замком");
            int option = GetIntInRange(2);

            if (option == 1)
            {
                Console.WriteLine("Возвращаемся обратно");
                _roomNumber = 4;
                Console.ReadLine();
            }

            if (option == 2)
            {
                CompleteQuest();
            }
        }

        static void CompleteQuest()
        {
            Console.Clear();
            Console.WriteLine("Подойдя к двери, ты обнаружил, что на ней висит кодовый замок.");
            Console.WriteLine("Чтобы открыть его нужно ввести слово из 9 букв, хм... что это за слово...");
            Console.WriteLine("Недолго думая, ты решаешь разглядеть надписи на стенах... А там...");
            Console.WriteLine("===================================================================");
            Console.WriteLine("Есть я у мужа, есть я у зверя, у мертвого камня, у облака.");
            Console.WriteLine("В душу не лезу, ловлю изменения облика.");
            Console.WriteLine("Дева, взглянув на меня - приосанится.");
            Console.WriteLine("Старец нахмурится, дитятко расхулиганится.");
            Console.WriteLine("Кто я? (Последня строка написана прямо под дверью).");

            Console.WriteLine("Тебе нужно ввести слово:");
            string answer = Console.ReadLine();

            while (answer.ToLower() != "отражение")
            {
                Console.WriteLine("Ты ввел неверное слово, попробуй еще раз:");
                answer = Console.ReadLine();
            }

            Console.WriteLine("Комната открылась и ты проходишь внутрь.");
            _roomNumber = 6;
            Console.ReadLine();
        }

        static void ActionOtherShip()
        {
            Console.Clear();
            Console.WriteLine("Зайдя во внутрь, ты видишь разрушенный зал. Сквозь потолок льеться свет...");
            Console.WriteLine("Дыра сверху была проделана кораблем твоего командира...");
            Console.WriteLine("Корабль вонзился в пол. Состояние его плачевное...");
            Console.WriteLine("Однако, ты заглядываешь внуть, но там никого нет.");
            Console.WriteLine("Разбираться с этим нет времени. Нужно найти модуль питания, если он уцелел.");
            int option;
            Console.WriteLine("Доступные действия:");
            Console.WriteLine("1. Вернуться обратно в комнату с загадкой.");

            if (!_hasModule)
            {
                Console.WriteLine("2. Осмотреть энергомодуль корабля");
                option = GetIntInRange(2);
            }

            else
            {
                option = GetIntInRange(1);
            }

            ChooseOptionsInOtherShip(option);
        }

        static void ChooseOptionsInOtherShip(int option)
        {
            if (option == 1)
            {
                Console.WriteLine("Возвращаемся обратно...");
                _roomNumber = 5;
                Console.ReadLine();
            }
            else
            {
                Console.WriteLine("Подойдя к энергетическому модулю, ты с радостью обнаруживаешь,");
                Console.WriteLine("Что идндикатор показывает десятую чать заряда. Этого должно хватить для полета!");
                Console.WriteLine("Этот корабль в негодном состоянии, придеться возвращаться на свой");
                Console.WriteLine("Ты аккуратно извлекаешь энергомодуль, теперь можно отправляться обратно.");
                _hasModule = true;
                Console.ReadLine();
            }
        }

        static void Introduction()
        {
            Console.WriteLine("Ты смутно помнишь где ты... Даже кто ты...");
            Console.ReadLine();
            Console.WriteLine("Тело сдавлено, однако твой мозг уже подает сигналы к жизни...");
            Console.WriteLine("Он говорит: - \"Ремень\"...");
            Console.ReadLine();
            Console.WriteLine("Давит не все тело, а именно грудная клетка. Машинально ты бьешь куда-то ниже бедра...");
            Console.WriteLine("Щелчок, и ты уже летишь куда-то вниз...");
            Console.ReadLine();
            Console.WriteLine(
                "Небольшой удар о пол твоего корабля. Да... после такой встряски твой мозг точно начал работать");
            Console.WriteLine(
                "Со скоростью молнии ты вспоминаешь последние 24 часа, хотя тебе и не хочеться вспоминать...");
            Console.ReadLine();
            Console.WriteLine("Вы в составе 2-ой эскадры были отправлены на патрулирование близ Мефистокла-7");
            Console.WriteLine("Дежурство как дежурство. Последние 2 года все дни были практически одинаковыми.");
            Console.WriteLine("Что менялось, так это виды космоса... Хотя, что интересного в нем можно увидеть?");
            Console.ReadLine();
            Console.WriteLine("Ваш отряд стоял на удалении пары десятков тысяч километров над поверхностью планеты.");
            Console.WriteLine("Внезапно, ты заметил, что зеленый Мефистокл стал больше... и он увеличивается.");
            Console.WriteLine("Нет, он стоит на месте, это просто наш отряд тянет к нему, будто сильным магнитом");
            Console.ReadLine();
            Console.WriteLine(
                "Последние 10 минут, что ты помнишь - это то как ты тщетно пытался выбраться из этого магнитного крюка");
            Console.WriteLine("Однако... теперь ты здесь... и судя по всему приземлился ты не очень...");
            Console.WriteLine(
                "Энергощит защитил корабль от критических повреждений, зато теперь топливо практически на нуле");
            Console.WriteLine("Разбираться с тем, что произошло будем потом, сейчас надо найти топливо");
            Console.WriteLine("В любом случае нужно хотя бы покинуть корабль");
        }

        static void Conclusion()
        {
            Console.WriteLine("Неприятное ощущение...");
            Console.WriteLine("По лицу пробежала дрожь. Холодные капли бьют по лицу.");
            Console.WriteLine(
                "Ты открываешь глаза и видишь серое небо родного города. Дождь медленно набирает обороты.");
            Console.WriteLine("Все это был сон... Всего лишь сон.");
            Console.WriteLine("\"Альберт, сигнала нет! Держи муфту ровно!\" - донеслось справа.");
            Console.ReadLine();
            Environment.Exit(0);
        }

        static int GetIntInRange(int optionsNumber)
        {
            string input = Console.ReadLine();
            int number = -1;
            bool isConverted = int.TryParse(input, out number);
            bool isInRange = number >= 1 && number <= optionsNumber;

            while (!isConverted || !isInRange)
            {
                Console.WriteLine("Неверная опция, попробуйте еще раз.");
                input = Console.ReadLine();
                isConverted = int.TryParse(input, out number);
                isInRange = number >= 1 && number <= optionsNumber;
            }

            return number;
        }
    }
}