import 'package:findmap/views/first.dart';
import 'package:findmap/views/mainPage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark);
    SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle(statusBarColor: Colors.transparent));

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Find anything fitted with you',
      theme: ThemeData(
        fontFamily: 'NanumBarunGothic',
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: SplashPage(),
    );
  }
}

class SplashPage extends StatefulWidget {
  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    _checkUser(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold();
  }

  void _checkUser(context) async {
    final storage = new FlutterSecureStorage();
    bool userStatus = false;
    print('${await storage.readAll()}');
    Map<String, String> allStorage = await storage.readAll();

    userStatus = allStorage.isEmpty ? false : true;

    if (userStatus) {
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => MainPage()));
    } else {
      Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (context) => FirstPage()));
    }
  }
}
